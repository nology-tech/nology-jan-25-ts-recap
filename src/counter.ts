import { CharInfo } from './Character';

export function setupCounter(element: HTMLButtonElement) {
    let counter = 0;
    const setCounter = (count: number) => {
        counter = count;
        element.innerHTML = `count is ${counter}`;
    };
    element.addEventListener('click', () => {
        setCounter(counter + 1);
        console.log('Clicked on button');
    });
    element.addEventListener('click', async () => {
        console.log('API CHAR');
        await createCharCard(counter);
    });

    setCounter(0);
}

export const getCharData = async (charId: number): Promise<CharInfo> => {
    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/${charId}`,
        );

        if (response.ok) {
            const data = await response.json();
            const { id, name, image, origin } = data;
            return { id, name, image, origin };
        } else {
            if (response.status === 404) {
                throw new Error(
                    `Character with ID: ${charId} was not found on the API`,
                );
            }
            if (response.status === 500) {
                throw new Error(`The API server is currenty not working`);
            }
            throw new Error(`${response.status}`);
        }
    } catch (error) {
        console.log('On Fetch this error happened:', error);
        return {
            id: 0,
            image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
            name: 'Unknown',
            origin: {
                name: 'Location not Found',
                url: '',
            },
        };
    }
};

const getQuote = async () => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': 'ZinaxutyAH6jOQTdPNwkBg==Bpu0gN2LQ3EvN7h1',
            },
        });
        if (response.ok) {
            return response.json();
        }
        return 'Something wrong error';
    } catch (error) {
        console.log(error);
    }
};

export const createCharCard = async (charId: number): Promise<void> => {
    const char = await getCharData(charId);
    const quote = await getQuote();

    if (char) {
        document.querySelector<HTMLDivElement>(
            '#chars',
        )!.innerHTML += `<div class="char">
        <img src="${char.image}" class="logo" alt="charImage" />
        <h1>${char.name}</h1>
        <p>Origin: ${char.origin.name}</p>
        <p class='quote'>Quote: ${quote[0].quote}</p>

    </div>`;
    }
};
