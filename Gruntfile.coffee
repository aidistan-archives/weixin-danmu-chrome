module.exports = (grunt) ->

  # Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    compress:
      options: {
        archive: 'weixin-danmu.zip'
      },
      files:
        src: ['data/**', '*.js', '*.html', '*.md', 'manifest.json']

  grunt.registerTask 'default', ['compress']
