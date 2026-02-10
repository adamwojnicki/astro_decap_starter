import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
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
                content: fields.markdoc({ label: 'Content' }),
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