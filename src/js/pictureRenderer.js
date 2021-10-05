import pictureCardTpl from '../template/picture-card';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';


class PictureRenderer
{
    #galleryContainer;

    constructor()
    {
        this.#galleryContainer = document.querySelector('.gallery');
        this.#galleryContainer.addEventListener('click', (event) => {
            if (event.target.nodeName === 'IMG')
            {
                this.openModal(event.target.dataset.src);
            }
        });
    }

    render(data)
    {
        this.#galleryContainer.insertAdjacentHTML('beforeend', pictureCardTpl(data));
    }

    clear()
    {
        this.#galleryContainer.innerHTML = '';
    }

    openModal(srcImg)
    {
        const instance = basicLightbox.create(`
            <img src="${srcImg}">
        `)
        instance.show()
    }
}

export default new PictureRenderer();