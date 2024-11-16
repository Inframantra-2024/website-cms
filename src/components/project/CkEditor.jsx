import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import LabelWithRequired from '../../component/UI/label';


const CKEditorComponent = ({ value, onChange }) => {
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        onChange(data);
    };



    return (
        <div>
            <LabelWithRequired isRequired={true}>Description</LabelWithRequired>
            <CKEditor
                    editor={ ClassicEditor }
                    data={value}
                    onChange={handleEditorChange}
                    onReady={ editor => {
                        // Allows you to store the editor instance and use it later.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        </div>
    );
};

export default CKEditorComponent;
