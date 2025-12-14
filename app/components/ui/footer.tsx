export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#3A6073] to-[#16222A] text-white mt-[100px]" role="contentinfo">
            <div className="pt-8 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6">
                            <div>
                                <h4 className="mb-4">Heading 1</h4>
                                <ul className="list-none p-0">
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline"></a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Payment Center</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Contact Directory</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Forms</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">News and Updates</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">FAQs</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6">
                            <div>
                                <h4 className="mb-4">Heading 2</h4>
                                <ul className="list-none p-0">
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Website Tutorial</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Accessibility</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Disclaimer</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Privacy Policy</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">FAQs</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Webmaster</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6">
                            <div>
                                <h4 className="mb-4">Heading 3</h4>
                                <ul className="list-none p-0">
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Parks and Recreation</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Public Works</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Police Department</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Fire</a></li>
                                    <li><a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline">Mayor and City Council</a></li>
                                    <li>
                                        <a href="#" className="text-white text-sm transition-colors duration-200 hover:text-[#FA944B] hover:no-underline"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6">
                            <h4 className="mb-4">Follow Us</h4>
                            <ul className="list-none inline ml-0 p-0">
                                <li className="inline mx-[5px]">
                                    <a href="#" className="group inline-block relative mx-auto rounded-full text-center w-[30px] h-[30px] text-[15px] bg-[#F9F9F9] hover:bg-[#3B5998] transition-all duration-200" title="Facebook">
                                        <i className="fa fa-facebook m-0 leading-[30px] text-center text-[#595959] group-hover:text-white group-hover:rotate-[360deg] transition-all duration-[800ms]"></i>
                                    </a>
                                </li>
                                <li className="inline mx-[5px]">
                                    <a href="#" className="group inline-block relative mx-auto rounded-full text-center w-[30px] h-[30px] text-[15px] bg-[#F9F9F9] hover:bg-[#007bb7] transition-all duration-200" title="Linkedin">
                                        <i className="fa fa-linkedin m-0 leading-[30px] text-center text-[#595959] group-hover:text-white group-hover:rotate-[360deg] transition-all duration-[800ms]"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                            <div className="text-xs p-[10px] border-t border-white">
                                <p className="text-center">&copy; Copyright 2018 - Company Name.  All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}