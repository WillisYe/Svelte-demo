/*
 * @Author: dary
 * @Date: 2021-01-19 11:59:08
 * @LastEditors: dary
 * @LastEditTime: 2021-02-01 11:13:38
 * @Description: file content
 */
module.exports = {
    plugins: [        
        require('postcss-import'),        
        require('postcss-preset-env')({ stage: 1 }),
        require('postcss-nested'),
    ],
};