import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/SectionHeader';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';

const blogs = [
  {
    title: "Building Scalable APIs with Django REST Framework",
    excerpt: "Learn how to design and implement production-ready APIs using Django REST Framework with best practices for authentication, pagination, and caching.",
    date: "Dec 28, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    category: "Django",
    slug: "building-scalable-apis-django",
    featured: true,
  },
  {
    title: "Introduction to Machine Learning with Python",
    excerpt: "A comprehensive guide to getting started with machine learning using Python, scikit-learn, and TensorFlow.",
    date: "Dec 20, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    category: "Machine Learning",
    slug: "intro-ml-python",
  },
  {
    title: "Docker & Kubernetes for Beginners",
    excerpt: "Understanding containerization and orchestration to deploy your applications like a pro.",
    date: "Dec 15, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
    category: "DevOps",
    slug: "docker-kubernetes-beginners",
  },
  {
    title: "Advanced Python Design Patterns",
    excerpt: "Explore design patterns that will make your Python code more maintainable and scalable.",
    date: "Dec 10, 2024",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    category: "Python",
    slug: "python-design-patterns",
  },
  {
    title: "Deep Learning with PyTorch: A Practical Guide",
    excerpt: "Build and train neural networks using PyTorch with hands-on examples and best practices.",
    date: "Dec 5, 2024",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    category: "Deep Learning",
    slug: "deep-learning-pytorch",
  },
  {
    title: "CI/CD Pipeline with GitHub Actions",
    excerpt: "Automate your development workflow with GitHub Actions for continuous integration and deployment.",
    date: "Nov 30, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
    category: "DevOps",
    slug: "cicd-github-actions",
  },
  {
    title: "Photography Tips for Developers",
    excerpt: "How my experience as a developer influences my photography and vice versa.",
    date: "Nov 25, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    category: "Photography",
    slug: "photography-tips-developers",
  },
  {
    title: "Django Security Best Practices",
    excerpt: "Essential security measures every Django developer should implement in their applications.",
    date: "Nov 20, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    category: "Django",
    slug: "django-security-best-practices",
  },
];

const categories = ["All", "Django", "Python", "Machine Learning", "Deep Learning", "DevOps", "Photography"];

const Blog = () => {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Blog & Articles"
          subtitle="Thoughts, tutorials, and insights on development, machine learning, DevOps, and photography"
        />

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg">
            Load More Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default Blog;
