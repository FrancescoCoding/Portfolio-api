import HttpException from '../utils/httpException';

export function removeScriptTags(userInput: string): string {
    if (userInput.includes('<script>')) {
        throw new HttpException(
            'User inputs cannot contain <script> tags 😡',
            418
        );
    }

    if (userInput.includes('<') && userInput.includes('>')) {
        throw new HttpException('User inputs cannot contain html tags 😡', 418);
    }

    return userInput.replace(/<[^>]*>/g, '').trim();
}

// eslint-disable-next-line no-useless-escape
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
