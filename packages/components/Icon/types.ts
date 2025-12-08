import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  border?: boolean; // 是否显示边框
  fixedWidth?: boolean; // 是否固定宽度
  flip?: "horizontal" | "vertical" | "both"; // 图标翻转方式
  icon: object | Array<string> | string | IconDefinition; // 图标内容，可以是对象、字符串数组、字符串或图标定义
  mask?: object | Array<string> | string; // 掩模内容，可以是对象、字符串数组或字符串
  listItem?: boolean; // 是否作为列表项使用
  pull?: "right" | "left"; // 图标的位置偏移，右侧或左侧
  pulse?: boolean; // 是否以脉动方式显示图标
  rotation?: 90 | 180 | 270 | "90" | "180" | "270"; // 图标的旋转角度
  swapOpacity?: boolean; // 是否交换不透明度
  size?: // 定义图标的大小
    | "2xs" // 超小
    | "xs"  // 小
    | "sm"  // 中小
    | "lg"  // 大
    | "xl"  // 超大
    | "2xl" // 双超大
    | "1x"  // 标准
    | "2x"  // 双倍大
    | "3x"  // 三倍大
    | "4x"  // 四倍大
    | "5x"  // 五倍大
    | "6x"  // 六倍大
    | "7x"  // 七倍大
    | "8x"  // 八倍大
    | "9x"  // 九倍大
    | "10x"; // 十倍大
  spin?: boolean; // 是否启用旋转动画
  transform?: object | string; // 变换效果，可以是对象或字符串
  symbol?: boolean | string; // 是否作为符号显示，或定义符号
  title?: string; // 图标标题
  inverse?: boolean; // 是否反转颜色
  bounce?: boolean; // 是否启用弹跳动画
  shake?: boolean; // 是否启用摇晃动画
  beat?: boolean; // 是否启用跳动动画
  fade?: boolean; // 是否启用渐变效果
  beatFade?: boolean; // 是否启用跳动与渐变效果
  spinPulse?: boolean; // 是否启用旋转脉动效果
  spinReverse?: boolean; // 是否反向旋转
  type?: "primary" | "success" | "warning" | "danger" | "info"; // 图标类型
  color?: string; // 图标颜色
}