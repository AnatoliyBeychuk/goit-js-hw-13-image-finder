import pictureRenderer from './pictureRenderer';
import { pictureLoader } from './apiService.js';

import { info, success, error, defaultModules, defaults } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaults.delay = 1000;
 
defaultModules.set(PNotifyMobile, {});

// ждем полной загрузки страницы
window.onload = () => {
    // устанавливаем настройки
    const options = {
        // родитель целевого элемента - область просмотра
        root: null,
        // без отступов
        rootMargin: '0px',
        // процент пересечения - половина изображения
        threshold: 0.75
    }

    // создаем наблюдатель
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach( async entry => {
            // если элемент является наблюдаемым
            if (entry.isIntersecting && pictureLoader.page > 1) {
                console.log('Дошли до конца списка, загружаем еще партию картинок...');
                try
                {
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
            }
        })
    }, options)

    //следим за кнопкой
    const target = document.querySelector('.load-more');
    observer.observe(target);
}