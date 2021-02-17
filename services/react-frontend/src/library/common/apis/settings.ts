import {ocrFetch} from 'library/utilities/fetch';

export const magnificationOCRRequest = (formData: any) => ocrFetch.post('/detect-magnification', formData).then(data => data);