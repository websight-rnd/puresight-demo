import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  const [logoWrapper, menuItemsWrapper, seachWrapper] = fragment.querySelectorAll(':scope > div');

  // eslint-disable-next-line
  debugger;

  const logoLink = logoWrapper.querySelector('a').href;
  const logoImg = logoWrapper.querySelector('img').src;
  const menuItmes = menuItemsWrapper.querySelectorAll('li');

  const navbarItemsHTML = [...menuItmes].map((item) => {
    const link = item.querySelector('a');

    link.classList.add('navbar-item');

    return link.outerHTML;
  }).join('');

  const searchIcon = seachWrapper.querySelector('img');
  const searchText = seachWrapper.textContent;

  block.innerHTML = `
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="container is-widescreen">
    <div class="navbar-brand">
      <a class="navbar-item" href="${logoLink}">
        <img
          src="${logoImg}"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" id="navMenu">
      <div class="navbar-end">
        ${navbarItemsHTML}

        <div class="navbar-item">
          <div id="autocomplete">
            <div
              class="aa-Autocomplete"
              role="combobox"
              aria-expanded="false"
              aria-haspopup="listbox"
              aria-labelledby="autocomplete-0-label"
            >
              <button type="button" class="aa-DetachedSearchButton">
                <div class="aa-DetachedSearchButtonIcon">
                  ${searchIcon.outerHTML}
                </div>
                <div class="aa-DetachedSearchButtonPlaceholder">${searchText}</div>
                <div class="aa-DetachedSearchButtonQuery"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
  `;
}
