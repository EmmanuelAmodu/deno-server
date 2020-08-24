export default {
    getShape: (
        { params, response }: { params: { id: string }; response: any },
    ) => {
        response.status = 200;
        response.body = {};
    },
}