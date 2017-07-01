import contentSwitch from './content_switch';
import animationLinksTemplate from '../templates/animationLinks.ejs';

export default class AnimationLoader {
	constructor(main) {
		this.main = main;
		this.animation = null;
	}

	/**
	 * Загрузка блока анимации
	 */
	loadAnimationBlock() {
		contentSwitch.addBlock('animation_block', localize({ru: 'Хореография', en: 'Choreography'}),
			`<div id="animationLinks"></div>
			<div class="svg-container animation-container">
				<svg id="animation" class="stretch-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"></svg>
			</div>`);
	}

	/**
	 * Загрузка анимации
	 * @param  {Object} AnimationClass  Класс анимации
	 */
	loadAnimation(AnimationClass) {
		if (this.animation) {
			this.animation.clear();
		}
		this.animation = new AnimationClass('animation');
		const ratio = this.animation.height / this.animation.width * 100;
		$('.animation-container').css('padding-bottom', ratio + '%');
		$('#animation')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('viewBox', '0 0 ' + this.animation.width + ' ' + this.animation.height);
	}

	/**
	 * Получить описание определённого класса анимации из массива
	 * @param  {Object} animationClassDefs  Массив описаний классов анимаций (из navigation.js)
	 * @param  {String} animationId         Идентификатор нужного класса
	 * @return {Object}                     Описание класса в виде {id, name, title}
	 */
	getAnimationClassDef(animationClassDefs, animationId) {
		let animationClass = animationClassDefs.filter(animationClassDef => animationClassDef.id === animationId);
		return animationClass[0] || animationClassDefs[0];
	}

	/**
	 * Показать ссылки на варианты анимации
	 * @param  {Object} animationClassDefs  Массив описаний анимаций
	 * @param  {String} currentAnimationId         Идентификатор текущей анимации
	 */
	showAnimationLinks(animationClassDefs, currentAnimationId) {
		$('#animationLinks').html(animationLinksTemplate({animationClassDefs, currentAnimationId}));
	}
}
