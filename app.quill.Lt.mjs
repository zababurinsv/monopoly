import Quill from 'quill';

export default ()=> new Promise((resolve) => {
        let object = {}
        object['Quill'] = Quill
        resolve(object)
});
