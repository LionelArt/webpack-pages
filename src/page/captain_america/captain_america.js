import '../../assets/css/common.scss';
import '../../assets/css/captain_america.scss';

const config = require('../../config.json');

let _pageTPL =
	`<div class="${config.hero2.en_name}">
		${config.hero2.cn_name}<br>
		<a href="index.html">返回</a>
	</div>`;

document.querySelector('.super-hero').innerHTML = _pageTPL;