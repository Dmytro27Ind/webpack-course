import * as $ from 'jquery'
import Post from "@/Post"
import json from './assets/json.json'
import WebpackLogo from './assets/webpack-logo.png'
import './styles/styles.css'
import './styles/sass_styles.sass'
import './styles/scss_styles.scss'


const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').addClass('code').html(post.toString())

console.log('Post to string: ', post.toString())

console.log("JSON", json)