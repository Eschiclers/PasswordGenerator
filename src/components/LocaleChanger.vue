<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" @change="ChangeLocale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LocaleChanger',
  data () {
    return { langs: ['es', 'en', 'fr', 'de', 'pt', 'ru', 'it'] }
  },
  methods: {
    ChangeLocale (e) {
      localStorage.setItem('locale', e.target.value);
    }
  },
  mounted () {
    if (localStorage.locale) {
      this.$i18n.locale = localStorage.getItem('locale')
    }else {
      var language = window.navigator.userLanguage || window.navigator.language || 'en';
      language = language.substring( 0, 2 );

      this.$i18n.locale = language;
      localStorage.setItem('locale', language)
    }
  }
}
</script>