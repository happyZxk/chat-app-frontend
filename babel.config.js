module.exports = {
  plugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "@arco-design/web-react",
        libraryDirectory: "es",
        camel2DashComponentName: false,
        style: true, // 启用样式按需加载
      },
      "@arco-design/web-react", // 这个参数用来区别不同的插件实例
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@arco-design/web-react/icon",
        libraryDirectory: "react-icon",
        camel2DashComponentName: false,
      },
    ],
  ],
};
