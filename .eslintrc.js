const OFF = 'off';
const ERROR = 'error';
const WARNING = 'warn';

module.exports = {
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写。
  'extends': [
    'airbnb'
  ],
  // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装。
  'parser': 'babel-eslint',
  // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境。
  'env': {
    'es6': true,
    'browser': true,
    'commonjs': true,
    'mocha': true,
    'jest': true,
    'node': true
  },
  // ESLint 支持使用第三方插件
  // 全局安装的 ESLint 只能使用全局安装的插件
  // 本地安装的 ESLint 不仅可以使用本地安装的插件还可以使用全局安装的插件
  // plugin 与 extend 的区别：extend 提供的是 eslint 现有规则的一系列预设
  // 而 plugin 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候，就可以借用插件来实现了
  // 插件名称省略了 eslint-plugin-
  'plugins': [
    'react',
    'react-native',
    'flowtype',
    'jsx-a11y',
    'import'
  ],
  // 具体规则配置
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  'rules': {
    // 规则
    'semi': ERROR,
    'indent': [OFF, 2],
    'eqeqeq': ERROR,
    'quotes': [ERROR, 'single', {allowTemplateLiterals: true}],
    'comma-dangle': OFF,
    'no-alert': OFF,
    'no-console': OFF,
    'no-multi-spaces': ERROR,
    'no-undef': OFF,
    'no-unused-vars': [ERROR, {vars: 'local', args: 'none'}],
    'no-mixed-operators': OFF,
    'no-plusplus': OFF,
    'no-lonely-if': OFF,
    'no-param-reassign': OFF,
    'class-methods-use-this': OFF,
    'radix': OFF,
    'max-len': OFF,
    'global-require': OFF,
    'no-unused-expressions': OFF,

    // ES6
    'constructor-super': ERROR,
    'arrow-spacing': ERROR,
    'no-const-assign': ERROR,
    'no-var': ERROR,
    'prefer-const': ERROR,
    'prefer-spread': ERROR,
    'prefer-template': ERROR,
    'no-dupe-class-members': ERROR,
    'no-this-before-super': ERROR,
    'require-yield': OFF,
    'no-useless-escape': OFF,
    'no-use-before-define': OFF,
    'no-useless-concat': OFF,

    // Modules
    'import/no-commonjs': OFF,
    'import/first': ERROR,
    'import/no-duplicates': ERROR,
    'import/extensions': ERROR,
    'import/newline-after-import': ERROR,
    'import/named': ERROR,
    'import/prefer-default-export': OFF,
    'import/no-extraneous-dependencies': OFF,

    // React
    'react/sort-comp': OFF,
    'react/prop-types': OFF,
    'react/no-multi-comp': OFF,
    'react/forbid-prop-types': OFF,
    'react/jsx-filename-extension': OFF,
    'react/prefer-stateless-function': OFF,
    'react/require-default-props': OFF,
    'react/jsx-uses-react': ERROR,
    'react/jsx-key': ERROR,
    'react/no-deprecated': ERROR,
    'react/jsx-max-props-per-line': [ERROR, {maximum: 4}],
    'react/jsx-uses-vars': ERROR,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': ERROR,
    'react/destructuring-assignment': OFF,

    // Flowtype
    'flowtype/define-flow-type': WARNING,
    'flowtype/no-weak-types': OFF
  },
  // 脚本在执行期间访问的额外的全局变量
  // 当访问未定义的变量时，no-undef 规则将发出警告。
  // 如果你想在一个文件里使用全局变量，推荐你定义这些全局变量，这样 ESLint 就不会发出警告了。
  'globals': {
    'fetch': true,
    'console': true,
    'requestAnimationFrame': true,
    'expect': true
  }
};
