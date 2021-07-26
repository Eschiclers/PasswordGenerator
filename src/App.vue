<template>
    <div id="app">
        <a class="github-fork-ribbon" href="https://github.com/Eschiclers/PasswordGenerator" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
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
                <label for="size">{{ $t("options.length") }}</label>
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
            Ninguna contraseña es guardada. Toda la generación ocurre en tu navegador.
            <br>
            Creado con <a href="https://vuejs.org/">Vue.js</a> y una version modificada de <a href="https://github.com/kognise/water.css">Water.css</a>
        </section>


        <footer>
            Este generador de contraseñas es gratuito y de <a href="https://github.com/Eschiclers/PasswordGenerator">código abierto</a>. Desarrollo alternativo por <a href="https://github.com/Eschiclers">@Eschiclers</a> y <a href="https://github.com/Eschiclers/PasswordGenerator/graphs/contributors">colaboradores</a> | Desarrollo original por <a href="http://github.com/Cadiducho">@Cadiducho</a> - <a href="https://cadiducho.com">Cadiducho.com</a>
        </footer>
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
    @import "./assets/css/gh-fork-ribbon.min.css";

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
