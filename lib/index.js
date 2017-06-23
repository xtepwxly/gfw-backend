const FB = require("fb");
const { client_id, client_secret, page_id, grant_type, access_token, gallery_id } = require("./../credentials");
const photoFiltering = (photos = []) => {
    const filterByWidth = img => {
        if (img.width >= 300) { return img; } 
    };

    const sortByWidth = (img1, img2) => img2.width < img1.width;

    return photos.map(data => {
        let { images, comments, likes, link } = data;
        images = images.filter(filterByWidth).sort(sortByWidth);
        comments = (comments && comments.data) ? comments.data.length : 0;
        likes = (likes && likes.data) ? likes.data.length : 0;
        return { images, comments, likes, link };
    });
}

const callFbApi = url => {
    const modifyData = function(data) {
        const json = data.photos || data;
        if (!json.data.length) { return []; }
        // else
        const photos = photoFiltering(json.data);
        const after = json.paging.cursors.after;
        return { photos, after };
    };

    return FB.api(url, "get", { access_token }).then(modifyData);
}

module.exports = { photoFiltering, callFbApi };