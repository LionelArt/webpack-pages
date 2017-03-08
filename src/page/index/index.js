import '../../assets/css/common.scss';
import '../../assets/css/index.scss';

let _pageTPL =
	`<h1>超级英雄</h1>
	<ul>
		<li><a href="iron_man.html">钢铁侠</a></li>
		<li><a href="captain_america.html">美国队长</a></li>
		<li><a href="the_hulk.html">绿巨人</a></li>
	</ul>`;

document.querySelector('.super-hero').innerHTML = _pageTPL;