<template>
  <div>
    <div :id="el" :style="{width: w+'px'}">

    </div>
    <div :id="text_el" :style="{width: w+'px'}">

    </div>
    <div :id="toolbar_el">

    </div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'Editor',
  props: ['el', 'h', 'w', 'toolbar_el', 'text_el'],
  data() {
    return {
      editor: null,
    }
  },
  methods: {
    initEditor() {
      if (this.el) {
        this.editor = new E('#' + this.el);
        this.editor.config.menus = [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'emoticon',
          'image',
        ]
        this.editor.config.uploadImgServer = 'http://localhost:8080/uploadImg'
        this.editor.config.uploadFileName = 'myFile'
      } else if (this.toolbar_el && this.text_el) {
        this.editor = new E('#' + this.toolbar_el, '#' + this.text_el);
        this.editor.config.menus = [
          'emoticon',
        ]
        this.editor.config.onchange = (newHTML) => {
          let tmp = document.createElement('div');
          tmp.innerHTML = newHTML.replaceAll(/<(\w+)>(.*)<\/\1>/g, '$2')
          this.$emit('textChange', tmp.textContent)
          tmp = null
        }
      }
      this.editor.config.showFullScreen = false
      this.editor.config.height = this.h
      this.editor.config.zIndex = 1
      this.editor.config.placeholder = ' '
      this.editor.config.focus = false
      this.editor.create()
    }
  },
  mounted() {
    this.initEditor()
  }
}

</script>

<style scoped>
* >>> .w-e-text-container, * >>> .w-e-toolbar {
  background-color: rgba(0, 0, 0, 0.08) !important;
  border: none !important;
}

* >>> .w-e-toolbar {
  margin-bottom: 1px;
}

* >>> *[class^=w-e-icon] {
  color: #333 !important;
}

* >>> .w-e-menu .w-e-panel-container .w-e-panel-tab-content {
  font-size: 22px;
}

#text_el >>> .w-e-text-container {
  height: 130px;
}

#text_el >>> .w-e-text-container .placeholder {
  color: #666;
}

#toolbar_el >>> .w-e-toolbar {
  position: absolute;
  bottom: -54px;
  right: 34%;
  padding: 0;
}

#toolbar_el >>> .w-e-panel-container {
  margin-top: -255px !important;
}

#toolbar_el >>> .w-e-panel-container {
  border: none;
  box-shadow: none;
}

* >>> .w-e-toolbar .w-e-menu-tooltip.w-e-menu-tooltip-up {
  visibility: hidden !important;
}

* >>> .w-e-toolbar .w-e-icon-close.w-e-panel-close {
  display: none;
}
</style>