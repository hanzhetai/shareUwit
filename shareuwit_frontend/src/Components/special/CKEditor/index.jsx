// import React, { Component } from 'react'

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import SelfDefinedCKEditor from '../../../3rd Party Tools/CKEditor/ckeditor'

// class editorPage extends Component {
//     render() {
//         return (
//             <div className="App">
//                 <h2>创造作品</h2>
//                 <CKEditor
//                     editor={ SelfDefinedCKEditor }
//                     data="<p>Hello from ShareUwit!</p>"
//                     onReady={ editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor is ready to use!', editor );
//                     } }
//                     onChange={ ( event, editor ) => {
//                         const data = editor.getData();
//                         console.log( { event, editor, data } );
//                     } }
//                     onBlur={ ( event, editor ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event, editor ) => {
//                         console.log( 'Focus.', editor );
//                     } }
//                 />
//             </div>
//         );
//     }
// }

// export default editorPage;