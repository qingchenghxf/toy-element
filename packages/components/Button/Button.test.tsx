/** @jsxImportSource vue */
import { describe, it, expect, vi, test } from "vitest"; // 引入测试工具
import { mount } from '@vue/test-utils' // 引入 Vue 组件测试工具

import Icon from "../Icon/Icon.vue"; // 引入 Icon 组件
import Button from "./Button.vue"; // 引入 Button 组件
import ButtonGroup from './ButtonGroup.vue' // 引入 ButtonGroup 组件

describe("Button.vue", () => { // 开始 Button 组件的测试
  const onClick = vi.fn(); // 创建一个模拟点击事件

  // 测试基本按钮
  test("basic button", async () => {
    const wrapper = mount(() => (
      <Button type="primary" onClick={onClick}>
        button content
      </Button>
    ));

    // 校验类名
    expect(wrapper.classes()).toContain("er-button--primary");

    // 校验插槽内容
    expect(wrapper.get("button").text()).toBe("button content");

    // 校验点击事件
    await wrapper.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledOnce(); // 确保点击事件被调用一次
  });

  // 测试禁用按钮
  test("disabled button", async () => {
    const wrapper = mount(() => (
      <Button disabled>
        disabled button
      </Button>
    ));

    // 校验类名
    expect(wrapper.classes()).toContain("is-disabled");

    // 校验属性
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find("button").element.disabled).toBeTruthy(); // 确保按钮被禁用

    // 校验点击事件 - 禁用状态下不应该触发 click 事件
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined(); // 确保没有触发 click 事件
  });

  // 测试加载中按钮
  test("loading button", async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: "loading button",
      },
    });

    // 校验类名
    expect(wrapper.classes()).toContain("is-loading");

    // 校验属性
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find("button").element.disabled).toBeTruthy();

    // 校验事件 - 加载状态下不应该触发 click 事件
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("click");

    // 校验图标
    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.props("icon")).toBe("spinner"); // 校验图标属性
  });

  // 测试图标按钮
  test("icon button", () => {
    const wrapper = mount(Button, {
      props: {
        icon: "arrow-up",
      },
      slots: {
        default: "icon button",
      },
    });

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy(); // 确保图标存在
    expect(iconElement.props("icon")).toBe("arrow-up"); // 校验图标属性
  });

  // 测试 type 属性
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any }, // 动态设置 type 属性
      });
      expect(wrapper.classes()).toContain(`er-button--${type}`); // 校验类名
    });
  });

  // 测试 size 属性
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any }, // 动态设置 size 属性
      });
      expect(wrapper.classes()).toContain(`er-button--${size}`); // 校验类名
    });
  });

  // 测试 plain, round, circle 属性
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true }, // 动态设置属性
      });
      expect(wrapper.classes()).toContain(className); // 校验类名
    }
  );

  // 测试原生 type 属性
  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" }, // 设置原生类型为 submit
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit"); // 校验按钮类型
  });

  // 测试点击事件是否被触发，包含和不包含节流
  it.each([
    ["withoutThrottle", false],
    ["withThrottle", true],
  ])("emits click event %s", async (_, useThrottle) => {
    const clickSpy = vi.fn(); // 创建点击事件的监视
    const wrapper = mount(() => (
      <Button
        onClick={clickSpy}
        {...{
          useThrottle,
          throttleDuration: 400,
        }}
      />
    ));

    await wrapper.get("button").trigger("click"); // 触发点击事件
    expect(clickSpy).toHaveBeenCalled(); // 验证监视被调用
  });

  // 测试 tag 属性
  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" }, // 设置 tag 属性为 a
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a"); // 校验渲染的标签
  });

  // 测试点击事件
  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});
    await wrapper.trigger("click"); // 触发点击事件
    expect(wrapper.emitted().click).toHaveLength(1); // 验证点击事件被触发
  });

  // 测试加载状态下的异常处理
  it("should display loading icon and not emit click event when button is loading", async () => {
    const wrapper = mount(Button, {
      props: { loading: true }, // 设置加载状态
    });
    const iconElement = wrapper.findComponent(Icon);


    
    expect(wrapper.find(".loading-icon").exists()).toBe(true); // 校验加载图标存在
    expect(iconElement.exists()).toBeTruthy(); // 校验图标存在
    expect(iconElement.props("icon")).toBe("spinner"); // 校验图标属性
    await wrapper.trigger("click"); // 触发点击事件
    expect(wrapper.emitted("click")).toBeUndefined(); // 验证点击事件未被触发
  });
});

// ButtonGroup 组件的测试
describe("ButtonGroup.vue", () => {
  // 测试基本按钮组
  test("basic button group", async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    expect(wrapper.classes()).toContain("er-button-group"); // 校验类名
  });

  // 测试按钮组的大小
  test("button group size", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`er-button--${size}`); // 校验按钮的类名
    });
  });

  // 测试按钮组的类型
  test("button group type", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`er-button--${type}`); // 校验按钮的类名
    });
  });

  // 测试按钮组的禁用状态
  test("button group disabled", () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    const buttonWrapper = wrapper.findComponent(Button);
    expect(buttonWrapper.classes()).toContain(`is-disabled`); // 校验按钮禁用状态的类名
  });
});