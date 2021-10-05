import './scss/main.scss';
import pictureRenderer from './js/pictureRenderer.js';
import { pictureLoader } from './js/apiService.js';
import { debounce } from 'lodash';


import { info, success, error, defaultModules, defaults } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaults.delay = 1000;
 
defaultModules.set(PNotifyMobile, {});
 

import './js/observer';

const searchForm = document.forms.search.elements.query;
const btnGoUp = document.querySelector('.go-up');
const galleryContainer = document.querySelector('.gallery');


btnGoUp.addEventListener('click', () =>
{
    btnGoUp.blur();
    galleryContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
})


searchForm.addEventListener('input', debounce(async (event) =>
{
    try
    {
        pictureRenderer.clear();
        pictureLoader.clearPage();
        if (event.target.value.trim() === '')
        {
            pictureLoader.setQuery('');
            return;
        }
        pictureLoader.setQuery(event.target.value);
        let data = await pictureLoader.loadPictures();
        if (data.hits.length === 0)
        {
            info({
                title: 'Ничего не найдено! Попробуйте изменить поисковый запрос.',
                modules: new Map([
                    [
                    ...defaultModules,
                    [PNotifyMobile, {
                        swipeDismiss: false,
                    }]
                ]
                ])
            });
        }
        else
        {
            success({
                title: `Загружено ${data.hits.length} шт.`,
                modules: new Map([
                    [
                    ...defaultModules,
                    [PNotifyMobile, {
                        swipeDismiss: false,
                    }]
                ]
                ])
            });
            pictureRenderer.render(data);
            pictureLoader.nextPage();
        }
    } catch (e)
    {
        error({
                title: 'Ошибка при загрузке картинок! Проверьте правильность поискового запроса.',
                modules: new Map([
                    [
                    ...defaultModules,
                    [PNotifyMobile, {
                        swipeDismiss: false,
                    }]
                ]
                ])
            });
    }
}, 500));