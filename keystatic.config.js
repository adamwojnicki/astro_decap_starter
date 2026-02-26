import { config, fields, collection } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components';

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
                    components: {
                        callout: wrapper({
                            label: 'Callout',
                            schema: {
                                type: fields.select({
                                    label: 'Type',
                                    description: 'Choose the type of callout',
                                    options: [
                                        { label: 'Info', value: 'info' },
                                        { label: 'Warning', value: 'warning' },
                                        { label: 'Danger', value: 'danger' },
                                    ],
                                    defaultValue: 'info'
                                }),
                            }
                        }),
                    },

                }),
            },
        }),
        pages: collection({
            label: 'Pages',
            slugField: 'title',
            path: 'src/content/pages/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Description' }),
                content: fields.markdoc({
                    label: 'Content',
                    components: {
                        hero: block({
                            label: 'Hero',
                            schema: {
                                title: fields.text({ label: 'Title' }),
                                description: fields.text({ label: 'Description', multiline: true }),
                            }
                        }),
                    },

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