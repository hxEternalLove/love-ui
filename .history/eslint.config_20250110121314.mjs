/**
 * ESLint 配置数组
 * 
 * 这个数组包含了一个或多个 ESLint 配置对象，每个对象定义了一组规则和配置选项。
 * 
 * @type {Array<Object>}
 */
export default [
    {
        rules: {
            semi: "error",// 强制使用分号
            "prefer-const": "error",// 使用const而不是let
        }
    }
];