namespace :assets do
  desc "Publish assets"
  task :publish do
    run_locally do
      execute "script/precompile.sh #{fetch(:current_revision)} #{fetch(:stage)}"
    end
  end

  desc "Transfer asset manifest"
  task :manifest do
    on roles(:all) do
      # All roles need to be able to link to assets
      upload! StringIO.new(File.read("public/assets/production/rev-manifest.json")), "#{release_path.to_s}/rev-manifest.json"
    end
  end

  after "deploy:updated", "assets:publish"
  after "deploy:updated", "assets:manifest"
end