import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default {
    esm: 'rollup',
    disableTypeCheck: false, // 如果出了问题，这个可以改成true
    cjs: { type: 'babel', lazy: true },
    lessInBabelMode: true,
    lessInRollupMode: {},
    extraRollupPlugins: [
        commonjs({
            include: './node_modules/**',
        }),
        copy({
            targets: [{ src: 'src/index.d.ts', dest: 'dist/' }],
        }),
    ],
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
            'antd',
        ],
        [
            'import',
            {
                libraryName: '@ant-design/icons',
                libraryDirectory: 'lib/icons',
                camel2DashComponentName: false,
            },
            '@ant-design/icons',
        ],
    ],
};
