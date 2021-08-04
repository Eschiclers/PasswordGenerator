<template>
    <div id="app">
        <a href="https://github.com/Eschiclers/PasswordGenerator" class="github-corner" aria-label="View source on GitHub">
            <div v-if="this.darkMode">
                <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body" style="color: #202b38"></path>
                </svg>
            </div>
            <div v-else>
                <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#202b38; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
                </svg>
            </div>
        </a>
        <vue-headful
                :title="$t('title')"
                :description="$t('title')"
        />
        <h1>{{ $t("title") }}</h1>

        <div class="row">
            <div>
                <h3>
                    <span v-if="!darkMode" @click="ChangeTheme()" class="pointer noselect">{{ $t("switch_to_darkmode") }}</span>
                    <span v-else @click="ChangeTheme()" class="pointer noselect"> {{ $t("switch_to_lightmode") }} </span>
                </h3>
            </div>
            <div>
                <LocaleChanger />
            </div>
        </div>

        <fieldset>
            <legend>{{ $t("settings") }}</legend>
            <p>
                <input type="checkbox" id="numbers" v-model="options.numbers" @change="generate()">
                <label for="numbers" :class="{ 'red': !options.numbers }">{{ $t("options.numbers_included") }}</label>
            </p>
            <p>
                <input type="checkbox" id="mayus" v-model="options.mayus" @change="generate()">
                <label for="mayus" :class="{ 'red': !options.mayus }">{{ $t("options.capital_letters_included") }}</label>
            </p>
            <p>
                <input type="checkbox" id="minus" v-model="options.minus" @change="generate()">
                <label for="minus" :class="{ 'red': !options.minus }">{{ $t("options.lower_case_letters_included") }}</label>
            </p>
            <p>
                <input type="checkbox" id="symbols" v-model="options.symbols" @change="generate()">
                <label for="symbols" :class="{ 'red': !options.symbols }">{{ $t("options.special_characters_included") }}</label>
            </p>
            <p>
                <input type="checkbox" id="save_options" v-model="options.save_options" @change="SaveOptions()">
                <label for="save_options">{{ $t("options.save_options") }}</label>
            </p>
            <hr>
            <p>
                <label for="size">{{ $t("options.length") }}
                    (<span v-if="options.size < 8" style="color: gold;">{{ $t("options.length_weak") }}</span>
                    <span v-else style="color: green;">{{ $t("options.length_strong") }}</span>)
                </label>
                <input type="number" min="1" id="size" v-model="options.size" @change="generate()">
            </p>
            <p>
                <label for="size">{{ $t("options.characters_to_avoid") }}</label>
                <input type="text" id="avoid" v-model="options.avoid" :placeholder="$t('options.characters_to_avoid_example')" @change="generate()">
            </p>
            <p>
                <input type="checkbox" id="hidden" v-model="options.hidden" @change="generate()">
                <label for="hidden">{{ $t("options.hide_generated_password") }}</label>
            </p>
        </fieldset>
        <section>
            <div class='row'>
                <div class="column">
                    <input id="generated" :type="options.hidden ? 'password' : 'text'" readonly :value="password">
                </div>
                <div class='column-4'>
                    <button v-clipboard:copy="password" v-clipboard:success="onCopy" :disabled="copy.copied">
                        {{ $t("copy") }}
                    </button>
                </div>
            </div>
            <button type="button" @click="generate()">{{ $t("generate_password") }}</button>
        </section>

        <section>
            <h2>{{ $t("about") }}</h2>
            <div v-html='$t("about_content")'>

            </div>
        </section>


        <footer v-html='$t("footer")'></footer>
    </div>
</template>

<script>
    import LocaleChanger from './components/LocaleChanger';

    export default {
        components: { LocaleChanger },
        name: 'PasswordGenerator',
        data: function () {
            return {
                password: this.value,
                options: {
                    numbers: true,
                    minus: true,
                    mayus: true,
                    symbols: true,
                    size: 8,
                    hidden: false,
                    avoid: '',
                    save_options: false,
                },

                copy: {
                    copied: false,
                },

                characters: {
                    type: String,
                    default: 'a-z,A-Z,0-9,#'
                },

                darkMode: false,
            }
        },
        mounted: function () {
            // Themes
            let htmlElement = document.documentElement;
            let theme = localStorage.getItem("theme");

            if (theme === 'dark') {
                htmlElement.setAttribute('theme', 'dark')
                this.darkMode = true
            } else {
                htmlElement.setAttribute('theme', 'light');
                this.darkMode = false
            }

            // Options
            if (localStorage.options) {
                this.options = JSON.parse(localStorage.options);
            }

            // Cargadas las opciones genera la contraseña
            this.generate();
        },
        methods: {
            generate() {
                this.SaveOptions();
                this.copy.copied = false;
                this.copy.texto = '🔖 ¡Copiar!';

                let characterList = '';
                let password = '';

                if (this.options.minus) {
                    characterList += 'abcdefghijklmnopqrstuvwxyz';
                }
                if (this.options.mayus) {
                    characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                }
                if (this.options.numbers) {
                    characterList += '0123456789';
                }
                if (this.options.symbols) {
                    characterList += '![]{}()%&*$#^<>~@|';
                }
                if (this.options.avoid) {
                    let i = this.options.avoid.length;
                    while (i--) {
                        let char = this.options.avoid.charAt(i);
                        characterList = characterList.replace(char, "");
                    }
                }

                const randomArray = window.crypto.getRandomValues(new Uint32Array(this.options.size))
                for (const number of randomArray) {
                    password += characterList.charAt(number % characterList.length);
                }
                this.password = password;
            },
            ChangeTheme() {
                this.darkMode = !this.darkMode;
            },
            SaveOptions() {
                if (this.options.save_options) {
                    localStorage.setItem('options', JSON.stringify({
                        numbers: this.options.numbers,
                        minus: this.options.minus,
                        mayus: this.options.mayus,
                        symbols: this.options.symbols,
                        size: this.options.size,
                        hidden: this.options.hidden,
                        avoid: this.options.avoid,
                        save_options: this.options.save_options,
                    }));
                } else {
                    localStorage.removeItem('options');
                }
            },
            onCopy() {
                this.copy.texto='✔️ Copiado';
                this.copy.copied = true;
            }
        },
        watch: {
            darkMode: function () {
                // add/remove class to/from html tag
                let htmlElement = document.documentElement;

                if (this.darkMode) {
                    localStorage.setItem("theme", 'dark');
                    htmlElement.setAttribute('theme', 'dark');
                } else {
                    localStorage.setItem("theme", 'light');
                    htmlElement.setAttribute('theme', 'light');
                }
            }
        }
    }
</script>

<style>
    @import "./assets/css/flex.css";
    @import "./assets/css/light.css";
    @import "./assets/css/theme-colors.css";
    @import "./assets/css/github-corner.css";

    input {
        margin-right: 5px!important;
    }
    .red {
        color: orangered;
    }
    .pointer {
        cursor: pointer;
    }
    .noselect, span, label {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    .row {
        align-items: center;
        justify-content: space-between;
    }
</style>
