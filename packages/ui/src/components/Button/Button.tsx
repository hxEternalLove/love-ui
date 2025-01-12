/*
 * Copyright (c) 2025 by 星语恋心-星语 
 * All Rights Reserved. 
 * @Author: 星语
 * @Date: 2025-01-12 20:00:53
 * @LastEditors: hxlove
 * @LastEditTime: 2025-01-12 23:23:14
 * @FilePath: \love-ui\packages\ui\src\components\Button\Button.tsx
 * @Description: 星语恋心出品，作者 @星语，版权归星语所有
 */
import React from 'react';
export interface ButtonProps {
    children: React.ReactNode;
}
export const Button = ({onClick, children}) => {
    return <button onClick={onClick}>{children}</button>
}
