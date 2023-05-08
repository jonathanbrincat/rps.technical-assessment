export default function carousel(selector) {
  const CSS_CLASS = {
    active: 'carousel__slide--active',
    cue: 'carousel__slide--cue',
    animateLeft: ['carousel__slide--to-right', 'carousel__slide--from-left'],
    animateRight: ['carousel__slide--to-left', 'carousel__slide--from-right'],
  }

  const DIRECTION = {
    left: -1,
    right: 1,
  }

  const $carousel = document.querySelector(selector)
  const $slider = $carousel.querySelector('.carousel__slider')
  const $slideCollection = $carousel.querySelectorAll('.carousel__slide')
  const $previousButton = $carousel.querySelector('.carousel__control--previous')
  const $nextButton = $carousel.querySelector('.carousel__control--next')

  if ($slideCollection.length <= 1) return $carousel.querySelectorAll('.carousel__control').forEach($el => $el.style.display = 'none')

  const $activeSlide = $carousel.querySelector(`.${CSS_CLASS.active}`) ?? $slideCollection[0].classList.add(CSS_CLASS.active)
  var index = Array.from($slideCollection).indexOf($activeSlide)
  var isEnabled = true

  $previousButton.addEventListener('click', () => carouselClickHandler(-1))
  $nextButton.addEventListener('click', () => carouselClickHandler(1))

  function render(i) {
    isEnabled = false

    const direction = i < index ? DIRECTION.left : DIRECTION.right
    const target = (i + $slideCollection.length) % $slideCollection.length

    $slideCollection[index].classList.add(direction === DIRECTION.left ? CSS_CLASS.animateLeft[0] : CSS_CLASS.animateRight[0])
    $slideCollection[target].classList.add(CSS_CLASS.cue, direction === DIRECTION.left ? CSS_CLASS.animateLeft[1] : CSS_CLASS.animateRight[1])

    index = target
  }

  function carouselClickHandler(n) {
    if (isEnabled) render(index + n)
  }

  $slider.addEventListener('animationend', function () {
    if (isEnabled) return

    $slideCollection.forEach(($el, i) => {
      $el.classList.toggle(CSS_CLASS.active, i === index)
      $el.classList.remove(CSS_CLASS.cue, ...CSS_CLASS.animateLeft, ...CSS_CLASS.animateRight)
    })

    isEnabled = true
  }, true)
}