import { API_KEY, baseId, reviews } from "../API.js";
import { fetchAPI } from "./fetchAPI.js";
import { imgOnLoad } from "./utils.js";


document.addEventListener("DOMContentLoaded", function () {

    const userIcon = './assets/icons/user.svg';
    const API_Reviews = `https://api.airtable.com/v0/${baseId}/${reviews}?listRecords&view=reviews`;
    const reviewsData = fetchAPI(API_Reviews, API_KEY);

    function getNick(enlace) {
        let partes = enlace.split('/');
        return partes[partes.length - 2];
    };

    reviewsData
        .then((data) => {
            // get data reviews
            const getReviews = (array) => {
                return array.map(record => {
                    const records = record.fields;
                    return records;
                });
            };

            const listReviews = getReviews(data.records);
            const iconSM = listReviews[0].social_media_icon[0].url;

            // get container reviews
            const reviewsContainer = document.querySelector('.feedback-list');
            reviewsContainer.innerHTML = '';

            listReviews.forEach(user => {

                // create a article to review
                const article = document.createElement('article');
                article.classList.add('feedback-item');

                // Get image profile
                let userImageURL = user.profile_photo ? user.profile_photo[0].url : null;
                if (userImageURL === null) userImageURL = userIcon;
                // User image
                const userImage = imgOnLoad(userImageURL,'none','none','userReview');
                // Nick Name container
                const userNameContainer = document.createElement('h3');
                // Instagram Icon
                const imgIcon = imgOnLoad(iconSM);
                //  Nick Name
                const userNameLink = document.createElement('a');
                userNameLink.textContent = getNick(user.social_media_name);
                userNameLink.href = user.social_media_name;
                userNameLink.target = '_blank';
                userNameLink.rel = 'noopener';
                // insert icon and nick in H3
                userNameContainer.appendChild(imgIcon);
                userNameContainer.appendChild(userNameLink);
                // User reviews
                const userReview = document.createElement('p');
                userReview.textContent = user.review;

                article.appendChild(userImage);
                article.appendChild(userNameContainer);
                article.appendChild(userReview);

                reviewsContainer.appendChild(article);
            });
            // ------------------------------------- //
            // Animation Reviews
            const feedbackItems = document.querySelectorAll('.feedback-item');
            let currentIndex = 0;
            let interval;

            function showFeedbackItem(index) {
                feedbackItems.forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
            }

            function startRotation() {
                interval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % feedbackItems.length;
                    showFeedbackItem(currentIndex);
                }, 7000);
            }

            function stopRotation() {
                clearInterval(interval);
            }

            // stop animation when mouse enter and start when mouse leave.
            feedbackItems.forEach(item => {
                item.addEventListener('mouseenter', stopRotation);
                item.addEventListener('mouseleave', startRotation);
            });

            showFeedbackItem(currentIndex);
            startRotation();

        }).catch((err) => {
            console.error('Ha ocurrido un Error:')
            throw err;
        });
});