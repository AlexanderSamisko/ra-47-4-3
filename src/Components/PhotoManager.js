import React, {useState} from 'react';
import PhotoItem from './PhotoItem';

export default function PhotoManager () {

    const [imgs, setImgs] = useState([]);

    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
// почему не требуется импортировать файл ридер? Он вшит?        
          fileReader.addEventListener('load', evt => {
            resolve(evt.currentTarget.result);
          });
          
          fileReader.addEventListener('error', evt => {
            reject(new Error(evt.currentTarget.error));
          });
          
          fileReader.readAsDataURL(file);
        });
      }

    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        setImgs([
            ...imgs, ...urls]);

    }

    return <div className='container'>
        <label htmlFor='file-input' className='file-label'>
           <span>Click to Select</span> 
        </label>
                <input onChange={(evt)=> handleSelect(evt)} name='file-input' id='file-input' accept="image/*,.pdf" multiple className='file-input' type="file" />
                <div className='photo-layout'>
                    {imgs.length ? imgs.map((item, index) => <PhotoItem items={imgs} changeItems={setImgs} path={item} key={index} />) : null}
                </div>
    </div>
}