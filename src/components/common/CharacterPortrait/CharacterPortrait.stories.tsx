import { type Meta, type StoryObj } from '@storybook/react-vite';

import { CharacterPortrait } from './CharacterPortrait';

type T = typeof CharacterPortrait;

export default {
  component: CharacterPortrait,
  title: 'common/CharacterPortrait',
} satisfies Meta<T>;

const RACES = ['garon', 'golan', 'human', 'lunar', 'pix', 'therian'];
const CLASSES = [
  'warrior',
  'guardian',
  'medic',
  'ranger',
  'mage',
  'hexer',
  'monk',
  'dancer',
  'summoner',
];

export const Default: StoryObj<T> = {
  args: { raceId: 'human', classId: 'warrior', size: 64 },
};

export const Matrix: StoryObj<T> = {
  render: () => (
    <div style={{ fontFamily: 'sans-serif', fontSize: 11 }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '4px 8px' }}>種族 \ 職業</th>
            {CLASSES.map((cls) => (
              <th
                key={cls}
                style={{ padding: '4px 8px' }}
              >
                {cls}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RACES.map((race) => (
            <tr key={race}>
              <td style={{ padding: '4px 8px', fontWeight: 700 }}>{race}</td>
              {CLASSES.map((cls) => (
                <td
                  key={cls}
                  style={{ padding: '4px', textAlign: 'center' }}
                >
                  <CharacterPortrait
                    raceId={race}
                    classId={cls}
                    size={48}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const Sizes: StoryObj<T> = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      {[36, 44, 48, 64, 80].map((size) => (
        <div
          key={size}
          style={{ textAlign: 'center', fontSize: 11 }}
        >
          <CharacterPortrait
            raceId="human"
            classId="warrior"
            size={size}
          />
          <div>{size}px</div>
        </div>
      ))}
    </div>
  ),
};
