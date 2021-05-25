<template>
  <div id="app">
    <div class="container">
      <div class="item">
          <h3 class="time">匹配时间:<span style="color: red;">{{time1}}</span>（毫秒）</h3>
          <h3>列表长度:{{showList.length}}</h3>
          <input placeholder="检索" type="text" v-model="kw1">
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

