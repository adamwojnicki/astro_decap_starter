import { config, fields, collection } from '@keystatic/core';

const isDev = process.env.NODE_ENV === 'development';

export default config({
    storage: isDev
        ? { kind: 'local' }
        : { kind: 'github', repo: 'user/repo' },
    collections: {
        posts: collection({
            label: 'Blog',
            slugField: 'title',
            path: 'src/content/blog/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Description' }),
                date: fields.date({ label: 'Date' }),
                author: fields.text({ label: 'Author' }),
                content: fields.markdoc({
                    label: 'Content',
                    options: {
                        components: {
                            callout: {
                                label: 'Callout',
                                schema: {
                                    type: fields.select({
                                        label: 'Type',
                                        options: [
                                            { label: 'Info', value: 'info' },
                                            { label: 'Warning', value: 'warning' },
                                            { label: 'Check', value: 'check' },
                                        ],
                                        defaultValue: 'info',
                                    }),
                                },
                            },
                        },
                    }
                }),
            },
        }),
        menu: collection({
            label: 'Restaurant Menu',
            slugField: 'title', // It will use the title to name the file/entry
            path: 'src/content/menu/*', // Keystatic prefers individual files per item
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Description', multiline: true }),
                price: fields.number({ label: 'Price' }),
            },
        }),
    },
});