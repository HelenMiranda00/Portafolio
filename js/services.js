import { API_KEY, baseId, services } from "../API.js";
import { fetchAPI } from "./fetchAPI.js";
import { imgOnLoad, isElementMiddleViewport } from "./utils.js";
const API_URL = `https://api.airtable.com/v0/${baseId}/${services}?listRecords&view=services`;

const resolve = fetchAPI(API_URL, API_KEY);
resolve
    .then((result) => {
        // funcion para extraer los datos de servicios
        const getDataServices = (array) => {
            return array.map((record) => {
                if (record.fields.title && record.fields.location && record.fields.price && record.fields.description && record.fields.image_1[0].url) {
                    let location = record?.fields?.location;
                    let category = record?.fields?.category;
                    let title = record?.fields?.title;
                    let subTitle = record?.fields?.sub_title;
                    let price = record?.fields?.price;
                    let description = record?.fields?.description;
                    let image = record?.fields?.image_1[0]?.url;
                    let textButton = record?.fields?.text_button;

                    return { title, category, subTitle, price, description, image, textButton, location };
                }
                return null;
            }).filter(item => item !== null);
        };
        const data = getDataServices(result.records);

        // filter for location in AirTable
        const filterForLocation = [];
        data.forEach(category => {
            if (category.location) {
                filterForLocation.push(category.location);
                return filterForLocation;
            };
        });
        const servicesLocation = new Set(filterForLocation);

        // filter for category in AirTable
        const filterForCategory = [];
        data.forEach(category => {
            if (category.category) {
                filterForCategory.push(category.category);
                return filterForLocation;
            };
        });
        const servicesCategory = new Set(filterForCategory);

        // Get Section in DOM
        const packagesContainer = document.querySelector("#services .packages");

        // CREATE CONTAINER FOR EACH SERVICES
        Array.from(servicesLocation).forEach((categoria, index_L) => {

            // create container
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("package-category");

            // create title container
            Array.from(servicesCategory).forEach((element, index_C) => {
                if (element && index_C === index_L) {
                    const categoryTitle = document.createElement("h3");
                    categoryTitle.textContent = element;
                    categoryDiv.appendChild(categoryTitle);

                    // create list services
                    const listCategory = document.createElement("div");
                    listCategory.classList.add("list-category");

                    // Create Cards in list services
                    data.forEach(record => {
                        if (categoria === record.location) {
                            //  Card
                            const card = document.createElement("div");
                            card.classList.add("package");
                            // img
                            const packageImage = imgOnLoad(record.image);
                            card.appendChild(packageImage);
                            // Package-details 
                            const packageDetails = document.createElement("div");
                            packageDetails.classList.add("package-details");
                            card.appendChild(packageDetails);

                            // DETAILS:
                            // title
                            const packageTitle = document.createElement("h3");
                            packageTitle.textContent = record.title;
                            packageDetails.appendChild(packageTitle);

                            // description Title
                            const desTitle = document.createElement('h4');
                            desTitle.textContent = record.subTitle;
                            packageDetails.appendChild(desTitle);

                            // Price
                            const packagePrice = document.createElement("p");
                            packagePrice.textContent = `B/. ${record.price}`;
                            packageDetails.appendChild(packagePrice);

                            // List Details
                            const detailsList = document.createElement("ul");
                            record.description.forEach(li => {
                                const listItem = document.createElement("li");
                                listItem.textContent = li;
                                detailsList.appendChild(listItem);
                            });
                            packageDetails.appendChild(detailsList);

                            // Button
                            const packageButton = document.createElement("button");
                            packageButton.textContent = record.textButton;
                            packageDetails.appendChild(packageButton);

                            // Add card in list category
                            listCategory.appendChild(card);
                        };
                    });

                    // Add list category in contatiner Services
                    categoryDiv.appendChild(listCategory);
                    // Add container in container Services
                    packagesContainer.appendChild(categoryDiv);
                };
            });
        });

        // Animacion para el scroll de las card de servicios.
        const cardServices = document.querySelectorAll('.package');
        cardServices.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('scaleLeft');
            } else {
                card.classList.add('scaleRight');
            };
        });

        document.addEventListener('scroll', function () {
            cardServices.forEach(function (element) {
                const elementTop = element.getBoundingClientRect().top < window.innerHeight;

                if (elementTop) {
                    if (element.classList.contains('scaleLeft')) {
                        element.classList.remove('scaleLeft');
                        element.classList.add('scaleDesable')
                    }
                    else if (element.classList.contains('scaleRight')) {
                        element.classList.remove('scaleRight');
                        element.classList.add('scaleDesable');
                    };
                };
            });
        });

    }).catch((err) => {
        console.error('Parece que hubo un error: ');
        throw err;
    });