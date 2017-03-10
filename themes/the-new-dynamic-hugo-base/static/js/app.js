/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Usage:
 * const detabinator = new Detabinator(element);
 * detabinator.inert = true;  // Sets all focusable children of element to tabindex=-1
 * detabinator.inert = false; // Restores all focusable children of element
 * Limitations: Doesn't support Shadow DOM v0 :P
 */

class Detabinator { // eslint-disable-line
  constructor (element) {
    if (!element) {
      throw new Error('Missing required argument. new Detabinator needs an element reference')
    }
    this._inert = false
    this._focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
    this._focusableElements = Array.from(
      element.querySelectorAll(this._focusableElementsString)
    )
  }

  get inert () {
    return this._inert
  }

  set inert (isInert) {
    if (this._inert === isInert) {
      return
    }

    this._inert = isInert

    this._focusableElements.forEach((child) => {
      if (isInert) {
        // If the child has an explict tabindex save it
        if (child.hasAttribute('tabindex')) {
          child.__savedTabindex = child.tabIndex
        }
        // Set ALL focusable children to tabindex -1
        child.setAttribute('tabindex', -1)
      } else {
        // If the child has a saved tabindex, restore it
        // Because the value could be 0, explicitly check that it's not false
        if (child.__savedTabindex === 0 || child.__savedTabindex) {
          return child.setAttribute('tabindex', child.__savedTabindex)
        } else {
          // Remove tabindex from ANY REMAINING children
          child.removeAttribute('tabindex')
        }
      }
    })
  }
}

/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * global requestAnimationFrame
 */

'use strict'

class SideNav {
  constructor () {
    this.showButtonEl = document.querySelector('.js-menu-show')
    this.hideButtonEl = document.querySelector('.js-menu-hide')
    this.sideNavEl = document.querySelector('.js-side-nav')
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container')
    // Control whether the container's children can be focused
    // Set initial state to inert since the drawer is offscreen
    this.detabinator = new Detabinator(this.sideNavContainerEl)
    this.detabinator.inert = true

    this.showSideNav = this.showSideNav.bind(this)
    this.hideSideNav = this.hideSideNav.bind(this)
    this.blockClicks = this.blockClicks.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.update = this.update.bind(this)

    this.startX = 0
    this.currentX = 0
    this.touchingSideNav = false

    this.supportsPassive = undefined
    this.addEventListeners()
  }

  // apply passive event listening if it's supported
  applyPassive () {
    if (this.supportsPassive !== undefined) {
      return this.supportsPassive ? {passive: true} : false
    }
    // feature detect
    let isSupported = false
    try {
      document.addEventListener('test', null, {get passive () {
        isSupported = true
      }})
    } catch (e) { }
    this.supportsPassive = isSupported
    return this.applyPassive()
  }

  addEventListeners () {
    this.showButtonEl.addEventListener('click', this.showSideNav)
    this.hideButtonEl.addEventListener('click', this.hideSideNav)
    this.sideNavEl.addEventListener('click', this.hideSideNav)
    this.sideNavContainerEl.addEventListener('click', this.blockClicks)

    this.sideNavEl.addEventListener('touchstart', this.onTouchStart, this.applyPassive())
    this.sideNavEl.addEventListener('touchmove', this.onTouchMove, this.applyPassive())
    this.sideNavEl.addEventListener('touchend', this.onTouchEnd)
  }

  onTouchStart (evt) {
    if (!this.sideNavEl.classList.contains('side-nav--visible')) {
      return
    }
    this.startX = evt.touches[0].pageX
    this.currentX = this.startX

    this.touchingSideNav = true
    requestAnimationFrame(this.update) // eslint-disable-line
  }

  onTouchMove (evt) {
    if (!this.touchingSideNav) {
      return
    }

    this.currentX = evt.touches[0].pageX
  }

  onTouchEnd (evt) {
    if (!this.touchingSideNav) {
      return
    }

    this.touchingSideNav = false

    const translateX = Math.min(0, this.currentX - this.startX)
    this.sideNavContainerEl.style.transform = ''

    if (translateX < 0) {
      this.hideSideNav()
    }
  }

  update () {
    if (!this.touchingSideNav) {
      return
    }

    requestAnimationFrame(this.update) // eslint-disable-line

    const translateX = Math.min(0, this.currentX - this.startX)
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`
  }

  blockClicks (evt) {
    evt.stopPropagation()
  }

  onTransitionEnd (evt) {
    this.sideNavEl.classList.remove('side-nav--animatable')
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd)
  }

  showSideNav () {
    this.sideNavEl.classList.add('side-nav--animatable')
    this.sideNavEl.classList.add('side-nav--visible')
    this.detabinator.inert = false
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  hideSideNav () {
    this.sideNavEl.classList.add('side-nav--animatable')
    this.sideNavEl.classList.remove('side-nav--visible')
    this.detabinator.inert = true
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }
}

new SideNav() // eslint-disable-line
