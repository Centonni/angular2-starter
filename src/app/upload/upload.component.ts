import { Component } from '@angular/core';

@Component({
    selector: 'as-upload',
    templateUrl: 'app/upload/upload.html'
})
export class UploadComponent {

    filesToUpload: Array<File>;

    constructor() {
        this.filesToUpload = [];
    }

    uploadFiles() {
        console.log('salut les gens');
        this.uploadFilesRequest('http://localhost:4000/uploads', [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(input: any) {
        this.filesToUpload = <Array<File>> input.target.files;
        console.log(this.filesToUpload);
    }

    uploadFilesRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}
