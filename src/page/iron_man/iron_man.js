import '../../assets/css/common.scss';
import '../../assets/css/iron_man.scss';

const config = require('../../config.json');

let _pageTPL =
	`<div class="${config.hero1.en_name}">
		${config.hero1.cn_name}<br>
		<a href="index.html">返回</a>
	</div>`;

document.querySelector('.super-hero').innerHTML = _pageTPL;