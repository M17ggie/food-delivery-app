import React, { useEffect } from 'react'

const usePageTitle = (pageTitle: string) => {
    useEffect(() => {
        document.title = `Food Cab | ${pageTitle}`
    }, [])
}

export default usePageTitle