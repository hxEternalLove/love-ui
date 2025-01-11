/**
 * ESLint 配置数组
 * 
 * 这个数组包含了一个或多个 ESLint 配置对象，每个对象定义了一组规则和配置选项。
 * 
 * @type {Array<Object>}
 */
export default [
    /**
     * ESLint 配置对象
     * 
     * 这个对象定义了一组规则和配置选项，用于检查和强制执行代码风格。
     * 
     * @type {Object}
     */
    {
        /**
         * 规则配置
         * 
         * 这个对象定义了具体的 ESLint 规则及其配置。
         * 
         * @type {Object}
         */
        rules: {
            /**
             * 强制使用分号
             * 
             * 这个规则要求在语句末尾使用分号。
             * 
             * @type {string}
             */
            semi: "error",

            /**
             * 建议使用 const
             * 
             * 这个规则建议使用 const 声明变量，而不是 let 或 var。
             * 
             * @type {string}
             */
            "prefer-const": "error",
        }
    }
]