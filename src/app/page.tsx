'use client'
import {useEffect, useState} from "react";

interface Article {
    author: string;
    categories: string[];
    content: string;
    description: string;
    enclosure: Record<string, unknown>;
    guid: string;
    link: string;
    pubDate: string;
    thumbnail: string | null;
    title: string;
}

const mediumUrl = "https://medium.com/feed/@linkonahad10";


export default function Home() {

    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.items);
                const items = data.items as Article[];
                setArticles(items);
            });
    }, []);


    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-between gap-3">
                {articles.map((article, index) => (
                    <div key={index}
                        className="w-full sm:w-1/2 lg:w-1/3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                        <a href="#">
                            <img className="h-60 w-full object-cover" src={article.description.match(/<img[^>]+src="([^">]+)"/)?.[1]}
                                 alt={article.title}/>
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {article.title}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Tags: {article.categories.map((category, index) => (
                                <a href={`#${category}`} key={index}>
                                    {category}
                                    {index < article.categories.length - 1 && ', '}
                                </a>
                            ))}
                            </p>
                            <a href={article.link}
                               className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute bottom-0 right-0 mr-8 mb-2">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
