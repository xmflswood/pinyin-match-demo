<template>
  <div id="app">
    <header>
      <h2 style="text-align: center;font-size: 1.5rem;">pinyin-match <span style="font-size: 1rem;">性能优秀的JS拼音匹配库</span></h2>
    </header>
    <p style="text-align: center;padding: 5px 0;">tips: 可打开控制台，使用 window.PinyinMatch 做演示</p>
    <div class="container">
      <div class="item">
          <h3 class="time">匹配时间:<span style="color: red;">{{time1}}</span>（毫秒）</h3>
          <h3>列表长度:{{showList.length}}</h3>
          <input placeholder="检索" type="text" style="padding: 5px 0;margin-top: 15px;" v-model="kw1">
          <div class="list">
              <div v-for="(i, index) in showList" :key="i + index">
                  {{index}}#:
                  <span v-html="i"></span>
              </div>
          </div>
      </div>
      <div class="item" v-if="!isMobile">
        <h3 class="time">匹配时间:<span style="color: red;">{{time2}}</span>（毫秒）</h3>
          <h3>字串长度（大量多音字）:{{long.length}}</h3>
          <input placeholder="检索" type="text" v-model="kw2">
          <p v-html="showText" class="list"></p>
        </div>
    </div>
    <footer>
      <a href="https://github.com/xmflswood/pinyin-match" target="_blank"><p>点个Star是对我最大的支持<svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true" class="octicon octicon-mark-github v-align-middle"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></p></a>
      <p>能赏杯咖啡就更好了hhh</p>
      <img src="./assets/wx.jpg" alt="">
      <img src="./assets/zfb.jpg" style="margin-left: 20px;">
      <p class="adv">招前端，社招/校招都可以，坑位足。坐标广州，有意向的简历发至邮箱：xmflswood@gmail.com</p>
    </footer>
  </div>
</template>

<script>
import data from './data'
import PinyinMatch from 'pinyin-match'
window.PinyinMatch = PinyinMatch
function redFont (str, start ,end) {
  return str.substring(0, start) + '<b style="color: red">' + str.substring(start, end + 1) + '</b>' + str.substring(end + 1)
}

export default {
  name: 'App',
  data () {
    return {
      list: data.list,
      showList: data.list,
      time1: 0,
      time2: 0,
      kw1: '',
      long: data.long,
      kw2: '',
      showText: data.long,
      isMobile: /windows phone|iphone|android/ig.test(window.navigator.userAgent)
    }
  },
  watch: {
    kw1 (v) {
      if (v) {
        var result = []
        var start = (new Date()).getTime()
        this.list.forEach(i => {
          var m = PinyinMatch.match(i, v)
          if (m) {
            result.push(redFont(i, m[0], m[1]))
          }
        })
        this.time1 = (new Date()).getTime() - start
        this.showList = result
      } else {
        this.time1 = 0
        this.showList = this.list
      }
    },
    kw2 (v) {
      if (v) {
        var start = (new Date()).getTime()
        var m = PinyinMatch.match(this.long, v)
        this.time2 = (new Date()).getTime() - start
        if (m) {
          this.showText = redFont(this.long, m[0], m[1])
        }
      } else {
        this.time2 = 0
        this.showText = this.long
      }
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
header {
  background: linear-gradient(120deg ,#7f70f5,#0ea0ff);
  color: #fff;
  box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
  padding: 1.6rem 0;
}
.container {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: row;
}
.list {
  overflow: auto;
  flex: 1;
  margin: 20px 0;
}
.item {
  flex: 1;
  margin: 15px;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.time {
  text-align: center;
  font-size: 1.2rem;
}
footer {
  height: 260px;
  text-align: center;
}
footer img {
  width: 150px;
}
.adv {
  color: red;
  font-weight: bold;
  font-size: 18px;
}
</style>
