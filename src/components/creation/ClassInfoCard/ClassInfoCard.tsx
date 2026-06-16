import styles from './style.module.scss';

import { CLASSES } from '@/data/classes';
import { WEAPON_TYPE_LABEL, ARMOR_TYPE_LABEL } from '@/data/equipLabels';
import { SKILLS } from '@/data/skills';
import type { ClassId } from '@/domain/types';

// ============================================================================
// 職業情報カード（issue #29）。職業 select 直下にライブ表示する。
// - 職業の説明文
// - 装備可能武器/防具（日本語ラベル）
// - 覚えるスキル一覧（名前 + 説明、スクロール可能）
// ============================================================================

type Props = {
  classId: ClassId;
};

export const ClassInfoCard = ({ classId }: Props) => {
  const cls = CLASSES[classId];
  if (!cls) return null;

  const weaponLabels = cls.equipableWeaponTypes.map((w) => WEAPON_TYPE_LABEL[w]);
  const armorLabels = cls.equipableArmorTypes.map((a) => ARMOR_TYPE_LABEL[a]);

  return (
    <div className={styles.card}>
      <div className={styles.className}>{cls.name}</div>
      <p className={styles.description}>{cls.description}</p>

      <div className={styles.equipSection}>
        <div className={styles.sectionLabel}>装備</div>
        <div className={styles.equipRow}>
          <span className={styles.equipKind}>武器</span>
          <span className={styles.equipList}>{weaponLabels.join(' / ')}</span>
        </div>
        <div className={styles.equipRow}>
          <span className={styles.equipKind}>防具</span>
          <span className={styles.equipList}>{armorLabels.join(' / ')}</span>
        </div>
      </div>

      <div className={styles.skillSection}>
        <div className={styles.sectionLabel}>習得スキル</div>
        <div className={styles.skillList}>
          {cls.skillTree.skills.map((node) => {
            const skill = SKILLS[node.skillId];
            if (!skill) return null;
            return (
              <div
                key={node.skillId}
                className={styles.skillItem}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillMaxLv}>最大Lv{node.maxLevel}</span>
                </div>
                <div className={styles.skillDesc}>{skill.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
