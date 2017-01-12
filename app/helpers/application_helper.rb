module ApplicationHelper
  # For displaying flash message using bootstrap
  def flash_class(level)
    case level.to_sym
      when :notice then "alert alert-danger"
      when :info then "alert alert-info"
      when :alert then "alert alert-danger"
      when :warning then "alert alert-warning"
    end
  end
end
