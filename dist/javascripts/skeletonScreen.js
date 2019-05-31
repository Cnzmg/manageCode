function MyPlugin(options) {
    this.template = options.template;
  }
   
  MyPlugin.prototype.apply = async function (compiler) {
    compiler.plugin('compilation', (compilation) => {
      console.log('The compiler is starting a new compilation...');
   
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        async (data, cb) => {
          console.log(cb)
          // await cb(null, data)
        }
      )
    })
  }
   
  module.exports = MyPlugin