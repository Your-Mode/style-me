import ky from 'ky';

export const kyInstance = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
});
