import * as changeCase from 'change-case';
import * as fs from 'fs';

export default function (plop) {
  plop.setGenerator('component', {
    description: 'make a component',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: 'componentのディレクトリ名を入力してください. ex) common',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component名を入力してください. ex) CustomButton',
      },
    ],
    actions: function (data) {
      var actions = [
        {
          type: 'add',
          path: 'src/components/{{camelCase dir}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'templates/component/component.tsx.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase dir}}/{{pascalCase name}}/style.module.scss',
          templateFile: 'templates/component/style.module.scss.hbs',
        },
      ];
      // storybookはcommonだけ作成
      if (data.dir === 'common') {
        actions.push({
          type: 'add',
          path: 'src/components/{{camelCase dir}}/{{pascalCase name}}/{{pascalCase name}}.stories.ts',
          templateFile: 'templates/component/component.stories.ts.hbs',
        });
      }
      return actions;
    },
  });
  plop.setGenerator('page', {
    description: 'make a page',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: 'pageのディレクトリ名を入力してください. ネストも可 ex) users or users/id',
      },
    ],
    actions: function (data) {
      var paths = data.dir.split('/');
      for (let i = 0; i < paths.length; i++) {
        paths[i] = changeCase.paramCase(paths[i]);
      }
      data.dir = paths.join('/');
      var actions = [
        {
          type: 'add',
          path: 'src/pages/{{dir}}/index.tsx',
          templateFile: 'templates/page/index.tsx.hbs',
        },
        {
          type: 'add',
          path: 'src/pages/{{dir}}/style.module.scss',
          templateFile: 'templates/page/style.module.scss.hbs',
        },
      ];
      return actions;
    },
  });
  plop.setGenerator('logic', {
    description: 'make a logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '作成するロジック名を入力してください. ex) getMonthRange',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/logics/{{camelCase name}}/{{camelCase name}}.tsx',
        templateFile: 'templates/logic/logic.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/logics/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: 'templates/logic/logic.test.ts.hbs',
      },
    ],
  });
  plop.setGenerator('api', {
    description: 'make a api logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '作成するAPIの名前を入力してください. ex) getUser',
      },
      {
        type: 'input',
        name: 'typeName',
        message: 'このAPIの戻り値の型を入力してください. ex) User',
      },
    ],
    actions: function (data) {
      var actions = [
        {
          type: 'add',
          path: 'src/api/{{camelCase name}}.ts',
          templateFile: 'templates/api/api.ts.hbs',
        },
      ];
      // 指定されたtypeが存在しないときだけ作成
      var typeFile = `src/types/${changeCase.camelCase(data.typeName)}.ts`;
      if (!fs.existsSync(`${plop.getDestBasePath()}/${typeFile}`)) {
        actions.push({
          type: 'add',
          path: typeFile,
          templateFile: 'templates/type/type.ts.hbs',
        });
      }
      return actions;
    },
  });
}
