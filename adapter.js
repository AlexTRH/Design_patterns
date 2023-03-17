class ImageConverter {



    static convert(image, newFormat) {

        // Какая-нибудь сложная логика...

        console.log(`Image converted to ${newFormat}!`);

        return image

    }

}

class ImageMeta {



    constructor(imageConverter) {

        this.converter = imageConverter

    }



    addMetaToJPG(image) {

        const convertedImage = this.converter.convertToJPG(image);

        convertedImage.meta = 'some meta for jpg'; // Очень сложная логика добавления meta для картинок с расширением jpg :)

        return convertedImage;

    }



    addMetaToPNG(image) {

        const convertedImage = new this.converter.convertToPNG(image);

        convertedImage.meta = 'some meta for png'; // Очень сложная логика добавления meta для картинок с расширением png :)

        return convertedImage;

    }

}

class ImageConverterAdapter {



    static convertToJPG(image) {

        ImageConverter.convert(image, 'jpg')

    }



    static convertToPNG(image) {

        ImageConverter.convert(image, 'png')

    }



}



const image = {

    path: 'https://web-artcraft.com/someimage.gif'

};



const imageWithMeta = new ImageMeta(ImageConverterAdapter);



const result = imageWithMeta.addMetaToJPG(image);