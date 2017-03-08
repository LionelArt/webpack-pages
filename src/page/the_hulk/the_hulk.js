import '../../assets/css/common.scss';
import '../../assets/css/the_hulk.scss';

const config = require('../../config.json');

let _pageTPL =
	`<div class="${config.hero3.en_name}">
		${config.hero3.cn_name}<br>
		<a href="index.html">返回</a>
	</div>`;

document.querySelector('.super-hero').innerHTML = _pageTPL;